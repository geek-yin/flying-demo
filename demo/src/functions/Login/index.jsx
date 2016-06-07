import React, { PropTypes } from 'react'
import { Form, FormItem } from 'bfd/Form2'
import FormInput from 'bfd/FormInput'
import { Checkbox } from 'bfd/Checkbox'
import xhr from 'bfd/xhr'
import auth from 'public/auth'
import './index.less'

export default React.createClass({

  contextTypes: {
    history: PropTypes.object
  },

  getInitialState() {
    this.rules = {
      username(v) {
        if (!v) return '请输入用户名'
      },
      password(v) {
        if (!v) return '请输入密码'
      }
    }
    return {
      user: {}
    }
  },

  handleChange(user) {
    this.setState({ user })
  },

  handleLogin() {
    this.refs.form.save()
  },

  handleSuccess(user) {
    auth.register(user)
    this.context.history.push(this.props.location.state.referrer)
  },

  style() {
    return "display:block";
  },

  handleRemember(e) {
    const user = this.state.user
    user.remember = e.target.checked
    this.setState({ user })
  },

  render() {
    return (
   	<div className="login">
		<div className="loginbody">
			<img src="/src/functions/Login/login.jpg" />
   		</div>
		<div className="login_container">
			<span className="loginlogo">
           		<img src="/src/functions/Login/login_logo.png" />
       		</span>
          <Form ref="form" className="loginform" action="login" onSuccess={this.handleSuccess} data={this.state.user} onChange={this.handleChange} labelWidth={0} rules={this.rules}>
            <div className="form-group form-bottom">
				<FormItem name="username">
              		<FormInput placeholder="账号" className="bfd-form-input"></FormInput>
            	</FormItem>
			</div>
            <FormItem name="password">
              <FormInput placeholder="密码" type="password" ></FormInput>
            </FormItem>
            <FormItem name="remember">
              <Checkbox onChange={this.handleRemember}>下次自动登录</Checkbox>
            </FormItem>
            <button type="submit" className="btn btn-primary" onClick={this.handleLogin}>登录</button>
          </Form>
			
		</div>
   	</div>
    )
  }
})
