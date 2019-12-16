/*
通过mutation间接更新state的多个方法的对象
 */

import {
    RECEIVE_PROBLEM,
    RECEIVE_USER
} from './mutations-types'
import {getCurrentUserInfo, getProblem} from '../api/requeset'

export default {
    // 异步获取用户信息
    getUser({commit}) {
        getCurrentUserInfo()
            .then(res => {
                // console.log(res);
                if (res.data.success) {
                    const user = res.data.extend.user;
                    commit(RECEIVE_USER, {
                        user
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 异步获取问题
    async getProblem({commit}, pid) {
        await getProblem()
            .then(res => {
                // console.log(res);
                const problem = res.data.extend.problem;
                commit(RECEIVE_PROBLEM, {
                    problem
                })
            })
            .catch(err => {
                console.log(err);
            });
    },
}