<template>
    <div class="container" style="margin-top: 80px;">
        <div class="row">
            <div class="col-md-12 order-md-1">
                <div class="problem" style="display:block;">
                    <div class="tit" v-text="problem.title"></div>
                    <div id="prbinfos">
                        <div
                                class="res"
                        >时间限制：{{problem.timeLimit*1.0/1000}}s &nbsp; 内存限制：{{problem.memoryLimit/1.0}}MB
                        </div>
                    </div>
                    <div style="text-align:center">
                        <button class="btn btn-primary" type="button"
                                @click="toSubmit"
                        >提交此题
                        </button>&nbsp;
<!--                        v-if="!canAlter"-->

                        <router-link
                                class="btn btn-warning"
                                role="button"
                                v-if="canAlter()"
                                :to="'/problem/alter/' + this.$route.params.id"
                        >修改此题
                        </router-link>
                    </div>
                    <div class="des">
                        <div v-for="(value,name) in showAttributes" :key="value">
                            <div v-if="problem[name] != ''">
                                <div class="sec_header">{{value}}</div>
                                <div class="sec_note" v-html="problem[name]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {getProblemView} from "../../api/requeset";
    import * as Swal from "sweetalert2";
    import {ROLE_NAME} from "../../api/static";

    export default {
        data() {
            return {
                problem: {},
                showAttributes: {
                    "description": "问题描述",
                    "formatInput": "输入格式",
                    "formatOutput": "输出格式",
                    "sampleInput": "样例输入",
                    "sampleOutput": "样例输出",
                    "hint": "提示",
                }
            };
        }, computed: mapState({
            user(state) {
                return state.user;
            }
        }),
        methods: {
            toSubmit() {
                // console.log(this.$route.query.contestId)
                if (this.user) {
                    this.$router.push({
                        path: '/problem/submit/' + this.$route.params.id,
                        query: {
                            contestId: this.$route.query.contestId
                        }
                    })
                } else {
                    Swal.fire(
                        '需要登录!',
                        '请先登录.',
                        'warning'
                    )
                }
            },
            canAlter() {
                return this.user != null && this.user.role === ROLE_NAME.ADMIN
            }
        },
        created() {
            // console.log(this.$route.query.contestId)
            getProblemView(this.$route.params.id)
                .then(res => {
                    // console.log(res);
                    this.problem = res.extend.problem;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>
<style>
    .problem .tit {
        font-size: 18px;
        font-family: "微软雅黑", "黑体", "宋体";
        text-align: center;
        margin: 10px 0px 20px 0px;
        font-weight: bold;
    }

    .problem .des {
        margin: 20px 80px 12px 80px;
        padding: 16px 40px 16px 40px;
        background: #e4f1ff;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: "宋体", "Times New Roman";
    }

    .problem .res {
        text-align: center;
        font-size: 0.8rem;
        color: #0e479d;
        margin: 0px 0px 14px 0px;
    }

    .problem .des .sec_note,
    .problem .helpbox .helpnote {
        border: #0066ff 1px dashed;
        margin: 8px 60px 12px 32px;
        padding: 8px 12px 8px 12px;
        font-family: "宋体";
    }

    .problem .des .sec_header,
    .problem .des .pdsec {
        font-family: "微软雅黑", "黑体", "宋体";
        margin: 16px 0px 8px 0px;
        font-size: 16px;
    }

    .problem .btns {
        text-align: center;
        margin: 30px 0px 25px 0px;
    }
</style>
