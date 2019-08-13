<template>
    <div class="register">
        <i class="el-icon-back back" @click="back"></i>
        <div class="content">
            <div class="info">
                <div :class="[input.name, 'row']" v-for="(input, index) of inputList" :key="index">
                    <label :for="input.name" class="text">{{ input.info }}</label>
                    <input :type="index === 0 ? 'text' : 'password'" :id="input.name" class="input" 
                        :autofocus="index === 0" :maxlength="input.maxlength" autocomplete="off"
                        @input="check(index, $event.currentTarget)" :pattern="input.pattern" :data-msg="input.msg">
                    <i class="icon el-icon-check"></i>
                    <div class="warning">
                        <p class="tips"></p>
                    </div>
                </div>
                <div class="submit" id="submit" @click="submit">
                    注册
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { debounce } from 'lodash-decorators';

import animateCSS from '../utils/animateCSS';
import { User } from '../interface/';

@Component
export default class Register extends Vue {

    @Action('saveLoginUser') saveLoginUser!: any;

    nullMsg = '输入为空！！！';
    inputList = [
        {
            info: '用户名',
            name: 'username',
            maxlength: '16',
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
        {
            info: '确认密码',
            name: 'check',
            maxlength: '20',
            pattern: '^[\\w]{6,20}$',
            msg: '6到20位（字母，数字）'
        },
    ];

    //后退
    back() {
        this.$router.go(-1);
    }

    //切换提示
    toggleTips(msgNode: HTMLParagraphElement, icon: HTMLElement, type: string, msg?: string) {
        switch (type) {
            case 'show':
                msgNode.style.display = 'block';
                msgNode.innerText = <string>msg;
                icon.style.display = 'none';
                break;
            case 'hidden':
                msgNode.style.display = 'none';
                icon.style.display = 'inline-block';
                break;
        }
    }

    //检测数据
    check(index: number, input: HTMLInputElement) {
        //检查是否符合正则
        let pattern = RegExp(input.pattern);
        let info = <HTMLDivElement>document.querySelector('.info');
        let msgNode = <HTMLParagraphElement>info.getElementsByClassName('tips')[index];
        let icon = <HTMLElement>info.getElementsByClassName('icon')[index];
        if (!input.value) {
            this.toggleTips(msgNode, icon, 'show', this.nullMsg);
            return;
        }
        if (pattern.test(input.value)) {
            this.toggleTips(msgNode, icon, 'hidden');
        } else {
            this.toggleTips(msgNode, icon, 'show', <string>input.getAttribute('data-msg'));
        }
        //当用户名满足正则后
        if (index === 0 && icon.style.display === 'inline-block') {
            this.checkHasName(msgNode, icon, input.value);
        }
        //检验密码是否相同
        let password = (<HTMLInputElement>document.getElementById('password')).value;
        let check = (<HTMLInputElement>document.getElementById('check')).value;
        if (index === 0 || !password || !check) return;
        if (password !== check) {
            this.toggleTips(msgNode, icon, 'show', '密码不相同！！！');
        } else {
            let passMsg = <HTMLParagraphElement>info.getElementsByClassName('tips')[1];
            let passIcon = <HTMLElement>info.getElementsByClassName('icon')[1];
            let checkMsg = <HTMLParagraphElement>info.getElementsByClassName('tips')[2];
            let checkIcon = <HTMLElement>info.getElementsByClassName('icon')[2];
            this.toggleTips(passMsg, passIcon, 'hidden');
            this.toggleTips(checkMsg, checkIcon, 'hidden');
        }
    }

    //检查数据库中是否已存在此用户名
    @debounce(1000)
    checkHasName(msg: HTMLParagraphElement, icon: HTMLElement, name: string) {
        this.$axios.get(this.$api.CHECK_LOGIN_NAME + name)
        .then((result) => {
            if (result.data.existed) {
                msg.style.display = 'block';
                icon.style.display = 'none';
                msg.innerText = '该用户名已存在';
            }
        }).catch((err) => {
            console.log(err);
        });
    } 

    //提交
    submit() {
        let info = <HTMLDivElement>document.getElementsByClassName('info')[0];
        let iconList = <HTMLElement[]>Array.from(info.getElementsByClassName('icon'));
        let flag = iconList.every((icon: HTMLElement): boolean => {
            return icon.style.display === 'inline-block';
        })
        if (!flag) {
            this.sendErrorMsg();
            animateCSS('#submit', 'swing');
            return;
        }
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        var recheck = () => {
            flag = iconList.every(icon => {
                return icon.style.display === 'inline-block';
            })
            if (!flag) {
                loading.close();
                return;
            } else {
                let username = <HTMLInputElement>document.getElementById('username');
                let password = <HTMLInputElement>document.getElementById('password');
                let arr = [username, password];
                this.$axios.post(this.$api.REGISTER_USER, {
                    login_name: username.value,
                    password: password.value,
                })
                .then((result) => {
                    if (result.data.success) {
                        let user: User = result.data.user;
                        this.saveLoginUser(user);
                        loading.close();
                        this.$destroy();
                        this.$router.push('/home');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        setTimeout(recheck, 2000);
    }

    //发送错误提示
    sendErrorMsg() {
        this.$notify.error({
            title: '错误',
            message: '请将信息填写完整！！！',
            duration: 2000
        });
    }
}
</script>

<style lang="scss" scoped>
    .register {
        height: 100%;
        background: $bg-color;
        .back {
            font-size: 50px;
            position: absolute;
            top: 30px;
            left: 30px;
        }
        .back:hover {
            background: $icon-hover-color;
            cursor: pointer;
            border-radius: 25px;
        }
        .content {
            margin: 0 auto;
            width: 50%;
            height: 100%;
            font-size: 25px;
            .info {
                padding: 10% 0;
                position: absolute;
                top: 0;
                bottom: 0;
                width: inherit;
                .row {
                    position: relative;
                    margin-bottom: 20px;
                    .text {
                        padding-bottom: 20px;
                        display: inline-block;
                        width: 25%;
                    }
                    .input {
                        border-radius: 5px;
                        font-size: 20px;
                        padding: 10px;
                        display: inline-block;
                        width: 60%;
                    }
                    .icon {
                        display: none;
                        position: absolute;
                        right: 0;
                        top: 10px;
                    }
                    .warning {
                        height: 20px;
                        padding: 10px 0;
                        width: 60%;
                        position: relative;
                        left: 30%;
                        .tips {
                            color: $warning-font-color;
                            font-size: 20px;
                            line-height: 20px;
                            white-space: nowrap;
                        }
                    }
                }
                .submit {
                    margin: 60px 30%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-radius: 15px;
                    background: #c1cbf1;
                    cursor: pointer;
                }
                .submit:hover {
                    background: #1dddeb;
                }
            }
        }
    }
</style>

