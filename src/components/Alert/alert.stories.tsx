import { Meta , StoryFn} from "@storybook/react";
import Alert from "./alert";

const alertMeta: Meta<typeof Alert> = {
    title : 'Alert',
    component: Alert,
    tags: ['autodocs'],
}

export default alertMeta;

const Template: StoryFn<typeof Alert> = (args) => (
    <Alert {...args} message="alert message"></Alert>
)

export const defaultAlert = Template.bind({})

defaultAlert.storyName = '默认样式'


export const AlertType: StoryFn<typeof Alert> = () => (
    <div>
        <Alert type="success" message=" success alert !"></Alert>
        <br/>
        <Alert type="danger" message=" danger alert !"></Alert>
        <br/>
        <Alert type="warning" message=" warning alert !"></Alert>
        <br/>
        <Alert type="default" message=" default alert !"></Alert>
    </div>
)

AlertType.storyName = "不同类型的弹框"

export const closeAlert = Template.bind({});
closeAlert.args = {
    closable : true
}

closeAlert.storyName = "可关闭的弹框"

export const desAlert = Template.bind({})

desAlert.args = {
    description : 'this is the description'
}
desAlert.storyName = "携带描述信息的弹框"

