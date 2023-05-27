import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './styles/index.scss'

library.add(fas)

export { default as Button } from './components/Button/button'
export { default as Menu } from './components/Menu'
export { default as AutoComplete } from './components/Input/autoComplete'
export { default as Icon } from './components/Icon/Icon'
export { default as Input } from './components/Input/input'
export { default as Progress } from './components/Progress/progress'
export { default as Transition } from './components/Transition/transition'
export { default as Upload } from './components/upload/upload'
export { default as Tabs } from './components/Tabs/tab'
export { default as Alert } from './components/Alert'
export { default as Select } from './components/Select/select'