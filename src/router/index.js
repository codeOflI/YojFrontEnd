/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/Home/Home.vue')

const ProblemSet = () => import('../pages/Problem/ProblemSet.vue')
const ProblemView = () => import('../pages/Problem/ProblemView.vue')
const SubmitProblem = () => import('../pages/Problem/SubmitProblem.vue')
const AlterProblem = () => import('../pages/Admin/Children/AdminProblem/AlterProblem.vue')
const AddProblem = () => import('../pages/Admin/Children/AdminProblem/AddProblem.vue')

const Login = () => import('../pages/User/Login/Login.vue')
const Register = () => import('../pages/User/Register/Register.vue')

const SolutionSet = () => import('../pages/Solution/SolutionSet.vue')
const SolutionDetail = () => import('../pages/Solution/SolutionDetail/SolutionDetail.vue')

// ------------------------------- user router------------------------------------------
const UserSet = () => import('../pages/User/UserSet/UserSet.vue')
const ResetPassword = () => import('../pages/User/ResetPassword/ResetPassword.vue')
const UserInfo = () => import('../pages/User/UserInfo/UserInfo.vue')
const UpdateUser = () => import('../pages/User/UpdateUser/UpdateUser.vue')
const AlterPassword = () => import('../pages/User/AlterPassword.vue')
// ------------------------------- user router------------------------------------------

// ------------------------------- admin router------------------------------------------
const Help = () => import('../pages/Help/Help.vue')

const Admin = () => import('../pages/Admin/Admin.vue')
const AdminProblem = () => import("../pages/Admin/Children/AdminProblem/AdminProblem")
const AdminUser = () => import("../pages/Admin/Children/AdminUser/AdminUser");
const AdminContest = () => import("../pages/Admin/Children/AdminContest/AdminContest");
const AdminSolution = () => import("../pages/Admin/Children/AdminSolution");
const AlterUserPassword = () => import("../pages/Admin/Children/AdminUser/alterUserPassword");

// ------------------------------- admin router------------------------------------------
//-------------------contest router-----------------
const ContestSet = () => import("../pages/Contest/ContestSet");
const AddContest = () => import("../pages/Admin/Children/AdminContest/AddContest");
const ContestView = () => import("../pages/Contest/ContestView");
const AlterContest = () => import("../pages/Admin/Children/AdminContest/AlterContest");
const ContestProblem = () => import("../components/Contest/ContestProblem")
const ContestRank = () => import("../components/Contest/ContestRank")
//-------------------contest router-----------------
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [{
        path: '/',
        redirect: '/problem'
    },
        {
            path: '/home',
            component: Home,
        }, {
            path: '/login',
            component: Login,
            meta: {
                hideTopBar: true,
                withOutLogin: true,
            }
        }, {
            path: '/register',
            component: Register,
            meta: {
                hideTopBar: true,
                withOutLogin: true,
            }
        }, {
            path: '/user',
            component: UserSet
        },
        {
            path: '/user/resetPassWord',
            component: ResetPassword,
            meta: {
                hideTopBar: true,
                withOutLogin: true,
            }
        },{
            path: '/user/info/:id',
            component: UserInfo,
        }, {
            path: '/user/update/:id',
            component: UpdateUser,
        }, {
            path: '/user/alterPassword/:id',
            component: AlterPassword,
        },
        {
            path: '/problem',
            component: ProblemSet,
        }, {
            path: '/problem/view/:id',
            component: ProblemView
        }, {
            path: '/problem/submit/:id',
            component: SubmitProblem
        }, {
            path: '/problem/alter/:id',
            component: AlterProblem
        }, {
            path: '/problem/add',
            component: AddProblem
        },
        {
            path: '/solution',
            component: SolutionSet
        },
        {
            path: '/solution/detail/:id',
            component: SolutionDetail
        }, {
            path: '/help',
            component: Help
        }, {
            path: "/admin",
            component: Admin,
            children: [{
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'problem',
                component: AdminProblem
            }, {
                path: 'user',
                component: AdminUser
            }, {
                path: 'alterUserPassword',
                component: AlterUserPassword
            }, {
                path: 'contest',
                component: AdminContest
            }, {
                path: 'solution',
                component: AdminSolution
            }]
        }, {
            path: "/contest",
            component: ContestSet,
        }, {
            path: "/contest/add",
            component: AddContest,
        }, {
            path: "/contest/view/:id",
            component: ContestView,
            redirect: '/contest/view/:id/contestProblem',
            name: 'contestView',
            children: [
                {
                    // 当 /contest/view/:id/contestProblem 匹配成功，
                    path: 'contestProblem',
                    component: ContestProblem
                },
                {
                    // 当 /contest/view/:id/contestSolution 匹配成功，
                    path: 'contestSolution',
                    component: SolutionSet
                },
                {
                    path: 'contestRank',
                    component: ContestRank
                }
            ]
        }, {
            path: "/contest/alter/:id",
            component: AlterContest,
        }

    ]
})