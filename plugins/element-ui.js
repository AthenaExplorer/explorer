import Vue from 'vue'
import '../assets/css/element-variables.scss'

import {
  Message,
  Loading,
  Tooltip,
  Notification,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  Pagination,
  Select,
  Option,
  Table,
  TableColumn,
  Button,
  DatePicker,
  Slider,
  Popover,
  CheckboxGroup,
  CheckboxButton,
  Switch,
  Aside,
  Dialog,
  MessageBox,
  Rate,
  InputNumber,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Tabs,
  TabPane,
  autocomplete
} from 'element-ui'

Vue.prototype.$confirm = MessageBox.confirm

export default () => {
  Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading
  Vue.prototype.$notification = Notification

  Vue.use(Input)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Pagination)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Button)
  Vue.use(DatePicker)
  Vue.use(Slider)
  Vue.use(Popover)
  Vue.use(CheckboxGroup)
  Vue.use(CheckboxButton)
  Vue.use(Switch)
  Vue.use(Aside)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Loading)
  Vue.use(Tooltip)
  Vue.use(Rate)
  Vue.use(InputNumber)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(MenuItemGroup)
  Vue.use(Submenu)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(autocomplete)
}