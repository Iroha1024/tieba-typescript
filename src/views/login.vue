<template>
    <div class="login" @keyup.enter="submit">
        <div class="content">
            <div :class="input.name" v-for="(input, index) of inputList" :key="index" style="position: relative">
                <label :for="input.name" class="text">{{ input.info }}</label>
                <input :type="index === 1 ? 'password' : 'text'" :id="input.name" class="input" 
                       :autofocus="index === 0" :maxlength="input.maxlength" autocomplete="off" 
                       :value="index === 0 ? getLocalUser.login_name : getLocalUser.password"
                       @input="check(index, $event.currentTarget)" :pattern="input.pattern" :data-msg="input.msg">
                <i class="el-icon-close clear" v-if="index === 0" @click="clear"></i>
                <div class="warning">
                    <p class="tips" style="display: none"></p>
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
import { Action, Getter } from 'vuex-class';

import { User } from '../interface/';
import animateCSS from '../utils/animateCSS';

@Component
export default class Login extends Vue {

    @Action('saveLoginUser') saveLoginUser!: any;
    @Action('clearLocalUser') clearLocalUser!: any;
    @Getter('getLocalUser') getLocalUser!: User;

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

    created() {
        // console.log(localStorage.getItem('user'));
        // console.log(this.$store.getters.getUser);
    }

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
            if (!input.value) {
                this.sendTipsMsg();
                return false;
            }
            let msgNode = <HTMLParagraphElement>(<HTMLElement>input.parentNode).getElementsByClassName('tips')[0];
            return msgNode.style.display === 'none';
        })
        if (judge) {
            this.$axios.post(this.$api.LOGIN, {
                username: username.value,
                password: password.value,
            })
            .then((result: any) => {
                //用户名或密码错误
                if (!result.data.success) {
                    animateCSS('#submit', 'swing');
                    this.sendErrorMsg();
                } else {
                    let user: User = result.data.user;
                    this.saveLoginUser(user);
                    this.$destroy();
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

    //发送提示
    sendTipsMsg() {
        this.$notify.error({
            title: '错误',
            message: '请输入完整信息！！！',
            duration: 2000
        });
    }

    //确认是否删除缓存
    clear() {
        if (!this.getLocalUser.id) {
            this.$message({
                message: '暂无缓存'
            })
            return;
        }
        const h = this.$createElement;
        this.$msgbox({
            title: '消息',
            message: h('p', undefined, [
                h('span', undefined, '确定删除缓存？'),
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    setTimeout(() => {
                        this.clearLocalUser();
                        done();
                    }, 500);
                } else {
                    done();
                }
            }
        })
        .then(() => {
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        })
        .catch(() => {})
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
            .clear {
                position: absolute;
                top: 55px;
                right: 10px;
                font-size: 30px;
                cursor: pointer;
                color: #eb7070;
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
