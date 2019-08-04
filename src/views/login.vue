<template>
    <div class="login" @keyup.enter="submit">
        <div class="content">
            <div :class="input.name" v-for="(input, index) of inputList" :key="index">
                <label :for="input.name" class="text">{{ input.info }}</label>
                <input :type="index == 1 ? 'password' : 'text'" :id="input.name" class="input" 
                       :autofocus="index == 0" :maxlength="input.maxlength" 
                       @input="check(index, $event.currentTarget)" :pattern="input.pattern" :data-msg="input.msg">
                <div class="warning">
                    <p class="tips"></p>
                </div>
            </div>
            <div class="button-area">
                <div class="button" id="submit" @click="submit">登录</div>
                <router-link to="/register" class="button" tag="div">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import animateCSS from '../utils/animateCSS';

@Component
export default class Login extends Vue {
    nullMsg = '输入为空！！！';
    inputList = [
        {
            info: '用户名',
            name: 'username',
            maxlength: '15',
            pattern: '^[\\w_-]{4,16}$',
            msg: '4到16位（字母，数字，下划线，减号）'
        },
        {
            info: '密码',
            name: 'password',
            maxlength: '20',
            pattern: '^[\\w]{6,20}$',
            msg: '6到20位（字母，数字）'
        },
    ];

    //检查是否符合正则
    check(index: number, input: HTMLInputElement) {
        let pattern = RegExp(input.pattern);
        let content = <HTMLDivElement>document.querySelector('.content');
        let msgNode = <HTMLParagraphElement>content.getElementsByClassName('tips')[index];
        if (!input.value) {
            msgNode.style.display = 'block';
            msgNode.innerText = this.nullMsg;
            return;
        }
        if (pattern.test(input.value)) {
            msgNode.style.display = 'none';
        } else {
            msgNode.style.display = 'block';
            msgNode.innerText = <string>input.getAttribute('data-msg');
        }
    }

    //提交
    submit() {
        let username = <HTMLInputElement>document.getElementById('username');
        let password = <HTMLInputElement>document.getElementById('password');
        let arr = [username, password];
        //所有报错消失时，才允许登录
        let judge = arr.every((input: HTMLInputElement): boolean => {
            let msgNode = <HTMLParagraphElement>(<HTMLElement>input.parentNode).getElementsByClassName('tips')[0];
            return msgNode.style.display === 'none';
        })
        if (judge) {
            this.$axios.post('/login', {
                username: username.value,
                password: password.value,
            })
            .then((result: any) => {
                //用户名或密码错误
                if (!result.data.success) {
                    animateCSS('#submit', 'swing');
                    this.sendErrorMsg();
                } else {
                    let user = result.data.user;
                    // console.log(user);
                    // this.$store.dispatch('initUser', user);
                    // this.$destroy('login');
                    this.$router.push('/home');
                }
            }).catch((err: any) => {
                console.log(err);
            });
        }
    }

    //发送错误提示
    sendErrorMsg() {
        this.$notify.error({
            title: '错误',
            message: '用户名或密码错误！！！',
            duration: 2000
        });
    }
} 
</script>


<style lang="scss" scoped>
    .login {
        width: 100%;
        height: 100%;
        background: url('../assets/img/login_bg.png') no-repeat fixed;
        background-size: cover;
        .content {
            width: 300px;
            height: 400px;
            margin-left: auto;
            margin-right: 90px;
            padding: 5%;
            font-size: 25px;
            background: inherit;
            position: relative;
            top: 10%;
            z-index: 10;
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 0.5em 1em rgba(0, 0, 0, 0.6);
            border-radius: 10%;
            .text {
                display: block;
                padding-bottom: 20px;
            }
            .input {
                border-radius: 5px;
                width: calc(100% - 20px);
                font-size: 20px;
                height: 30px;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.12);
            }
            .input:focus {
                border-color: #2188ff;
                box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075), 0 0 0 0.2em rgba(25, 108, 202, 0.58);
            }
            .warning {
                height: 20px;
                padding: 10px 0;
                .tips {
                    color: $warning-font-color;
                    font-size: 20px;
                    line-height: 20px;
                    white-space: nowrap;
                }
            }
            .button-area {
                padding: 60px 10px;
                display: flex;
                justify-content: space-around;
                .button {
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 10px;
                    background: rgba(203, 235, 244, 0.32);
                }
            }
        }
        .content::after {
                content: '';
                width: 100%;
                height: 100%;
                position: absolute;
                filter: blur(5px);
                left: 0;
                top: 0;
                background: inherit;
                z-index: -1;
            }
    }
</style>
