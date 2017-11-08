/*
* @Author: zhou
* @Date:   2017-11-08 10:05:01
* @Last Modified by:   zhou
* @Last Modified time: 2017-11-08 23:15:01
*/

$(function(){
  // ------ 一. 登录表单验证  validator.js
  $(function () {
      $('form').bootstrapValidator({
        //1. 配置校验表单小图标 
      　feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        //2. 验证规则 
        fields: {
            //2-1 用户名验证
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{  
                      message: '提示用户名错误'
                    }
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_]+$/,
                    //     message: '用户名只能包含大写、小写、数字和下划线'
                    // }
                }
            },
            //2-2 密码验证
            password: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    stringLength:{
                      min:6,
                      max:8,
                      message: '用户名长度必须在6到8位之间'
                    },
                    callback:{  
                      message: '提示密码错误'
                    }
                }
            }
        }
      });
  });


  // ------ 二. 点击登录发送ajax
  $('#submit').on('click',function(e){
    //2.1 阻止 submit  默认登录
    e.preventDefault();

    //2.2 发送ajax
    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      data:$("form").serialize(),
      success:function(data){
        console.log(data)
        //2.2-1 输入正确跳转到index.html
        if(data.success){
          location.href = "index.html";
        }

        //2.2-2 当data.error === 1000 提示帐号错误
        if(data.error === 1000){
          // alert(data.message) 
           $('form').data("bootstrapValidator").updateStatus('username','INVALID','callback');
        }

        //2.2-3 当data.error === 1001 提示密码错误
        if(data.error === 1001){
          // alert(data.message) 
          // 将提示的信息放到 bootstrapValidator 里面
          //第一个参数：字段名  表单中的name属性
          //第二个参数：INVALID :校验失败
          //第三个参数：配置提示消息
          $('form').data("bootstrapValidator").updateStatus('password','INVALID','callback');
        }

      }
    })
  });


  // ------ 三. 点击重置按钮
  $('#reset').on('click',function(){
    $('form').data('bootstrapValidator').resetForm();
  });

});
