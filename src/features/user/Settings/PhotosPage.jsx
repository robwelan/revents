import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import { toastr } from 'react-redux-toastr';
import {
  Button,
  Card,
  Divider,
  Icon,
  Image,
  Grid,
  Header,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import {
  deletePhoto,
  setMainPhoto,
  uploadProfileImage,
} from '../userActions';
import '../../../../node_modules/cropperjs/dist/cropper.css';

const actions = {
  doDeletePhoto: deletePhoto,
  doSetMainPhoto: setMainPhoto,
  doUploadProfileImage: uploadProfileImage,
};

const mapState = state => ({
  auth: state.firebase.auth,
  loading: state.async.loading,
  photos: state.firestore.ordered.photos,
  profile: state.firebase.profile,
});

const query = ({ auth }) => [
  {
    collection: 'users',
    doc: auth.uid,
    subcollections: [
      {
        collection: 'photos',
      },
    ],
    storeAs: 'photos',
  },
];

class PhotosPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      fileName: '',
      cropResult: null,
      image: {},
    };

    this.cancelCrop = this.cancelCrop.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  onDrop(files) {
    this.setState({
      files,
      fileName: files[0].name,
    });
  }

  cropImage() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);

      this.setState({
        cropResult: imageUrl,
        image: blob,
      });
    }, 'image/jpeg');
  }

  cancelCrop() {
    this.setState({
      files: [],
      image: {},
    });
  }

  handlePhotoDelete(photo) {
    const { doDeletePhoto } = this.props;

    return async () => {
      try {
        doDeletePhoto(photo);
      } catch (error) {
        toastr.error('Oops', error.message);
      }
    };
  }

  handleSetMainPhoto(photo) {
    const { doSetMainPhoto } = this.props;

    return async () => {
      try {
        doSetMainPhoto(photo);
      } catch (error) {
        toastr.error('Oops', error.message);
      }
    };
  }

  async uploadImage() {
    try {
      const { doUploadProfileImage } = this.props;
      const { image, fileName } = this.state;

      await doUploadProfileImage(image, fileName);
      this.cancelCrop();

      toastr.success('Success!', 'Photo has been uploaded.');
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  }

  render() {
    const {
      cropResult,
      files,
    } = this.state;
    const {
      loading,
      photos,
      profile,
    } = this.props;

    let filteredPhotos;
    if (photos) {
      filteredPhotos = photos.filter(photo => (
        photo.url !== profile.photoURL
      ));
    }

    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone
              multiple={false}
              onDrop={this.onDrop}
            >
              <div style={{ padding: '30px', textAlign: 'center' }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to add." />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {files[0]
              && (
                <Cropper
                  aspectRatio={1}
                  crop={this.cropImage}
                  cropBoxMovable={true}
                  cropBoxResizable={true}
                  dragMode="move"
                  guides={false}
                  ref="cropper"
                  scalable={true}
                  src={files[0].preview}
                  style={{ height: 200, width: '100%' }}
                  viewMode={0}
                />
              )
            }
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {files[0]
              && (
                <div>
                  <Image
                    src={cropResult}
                    style={{ minHeight: '200px', minWidth: '200px' }}
                  />
                  <Button.Group>
                    <Button
                      icon="check"
                      loading={loading}
                      onClick={this.uploadImage}
                      positive
                      style={{ width: '100px' }}
                    />
                    <Button
                      disabled={loading}
                      icon="close"
                      onClick={this.cancelCrop}
                      style={{ width: '100px' }}
                    />
                  </Button.Group>
                </div>
              )
            }
          </Grid.Column>

        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || '/assets/user.png'} />
            <Button positive>Main Photo</Button>
          </Card>

          {
            photos
            && (
              filteredPhotos.map(photo => (
                <Card key={photo.id}>
                  <Image
                    src={photo.url}
                  />
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="green"
                      onClick={this.handleSetMainPhoto(photo)}
                    >
                      Main
                    </Button>
                    <Button
                      basic
                      icon="trash"
                      color="red"
                      onClick={this.handlePhotoDelete(photo)}
                    />
                  </div>
                </Card>
              ))
            )
          }
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => query(auth)),
)(PhotosPage);
