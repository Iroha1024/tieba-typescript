<template>
    <div class="info-edit">
        <el-drawer
            title="修改信息"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" autocomplete="off" maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                        <el-input v-model="form.password" autocomplete="off" maxlength="20" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
                        {{ loading ? '提交中 ...' : '确 定' }}
                    </el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { Action, Getter } from 'vuex-class';

import { User } from '@/interface/';

@Component
export default class InfoEdit extends Vue {

    @Action('saveLoginUser') saveLoginUser!: any;
    @Getter('getLocalUser') getLocalUser!: User;

    @Prop() dialog!: boolean;

    @Watch('dialog')
    update(val: string) {
        this.$emit('update:dialog', val);
    }

    loading = false;

    form = {
        name: '',
        sex: '',
        password: '',
    }

    rules = {
        name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { pattern: /^[\w_-]{4,16}$/, message: '4到16位（字母，数字，下划线，减号）' }
        ],
        sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[\w]{6,20}$/, message: '6到20位（字母，数字）' }
        ],
    }

    formLabelWidth ='100px'

    //提交表单前验证
    submitForm()  {
        let flag;
        (<ElForm>this.$refs.form).validate((valid) => {
            if (valid) {
                flag = true;
            } else {
                flag = false;
            }
        });
        return flag;
    }

    //发送编辑信息
    sendEditInfo() {
        this.$axios.post(this.$api.SEND_EDIT_INFO, {
            id: this.getLocalUser.id,
            login_name: this.getLocalUser.login_name,
            name: this.form.name,
            sex: this.form.sex,
            password: this.form.password,
        })
        .then((result) => {
            if (result.data.success) {
                let user: User = result.data.user;
                this.saveLoginUser(user);
                this.$emit('updateInfo');
            }
        })
        .catch((err) => {
            console.log(err);    
        });
    }

    //关闭窗口
    handleClose(done: any) {
        if (!this.submitForm()) return;
        this.$confirm('确定要提交表单吗？')
        .then(_ => {
            this.loading = true;
            setTimeout(() => {
            this.loading = false;
            this.sendEditInfo();
            (<ElForm>this.$refs.form).resetFields();
            done();
            }, 1000);
        })
        .catch(_ => {});
    }

}
</script>

<style lang="scss" scoped>
    /deep/ .demo-drawer {
        width: 500px !important;
        font-size: 20px;
    }

    /deep/ .el-drawer__close-btn {
        display: none;
    }

    /deep/ .el-form-item {
        margin-bottom: 50px;
    }

    /deep/ .el-form-item__content {
        width: 300px;
    }

    /deep/ .el-form-item__label {
        font-size: 18px;
    }

    /deep/ .el-input--small {
        font-size: 20px;
    }

    /deep/ .el-input__inner {
        width: 300px;
        padding: 20px;
    }
    .demo-drawer__content {
        .demo-drawer__footer {
            width: fit-content;
            margin: 0 auto;
            .el-button {
                margin: 20px;
                font-size: 20px;
            }
        }
    }
</style>
