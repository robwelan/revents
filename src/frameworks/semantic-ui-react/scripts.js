/*
  semantic-ui-react/dist/commonjs
*/
// Addons
import Select from 'semantic-ui-react/dist/commonjs/addons/Select';

// Collections
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
// import FormField from 'semantic-ui-react/dist/commonjs/collections/Form/FormField';
import Menu from 'semantic-ui-react/dist/commonjs//collections/Menu';

// Elements
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

// Grid
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
// import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';
// import GridRow from 'semantic-ui-react/dist/commonjs/collections/Grid/GridRow';

// Modules
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

// Views
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
// import ItemContent from 'semantic-ui-react/dist/commonjs/views/Item/ItemContent';
// import ItemHeader from 'semantic-ui-react/dist/commonjs/views/Item/ItemHeader';
// import ItemImage from 'semantic-ui-react/dist/commonjs/views/Item/ItemImage';

/*
  semantic-ui-react/dist/commonjs
*/

/*
  NOTE: it appears you only need to expose a parent item.
  a parent item's children are imported as dependencies automagically.
*/

// const framework = 'semantic-ui-react';
// const pathCommon = `${framework}/dist/commonjs`;

export {
  Button,
  Comment,
  Container,
  Dropdown,
  Form,
  // FormField,
  Grid,
  // GridColumn,
  // GridRow,
  Header,
  Icon,
  Item,
  // ItemContent,
  // ItemHeader,
  // ItemImage,
  Image,
  Label,
  List,
  Menu,
  Select,
  Segment,
};
