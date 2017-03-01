import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '../components/Index.vue'
import Collect from '@/components/Collect.vue'
import Atten from '@/components/Atten.vue'
import Follow from '@/components/Follow.vue'
import SearchFollow from '@/components/SearchFollow.vue'
import Search from '@/components/Search.vue'
import Rank from '@/components/Rank.vue'
import Channel from '@/components/Channel.vue'

Vue.use(Router)

var routes =[
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path:'/collect',
      name:'collect',
      component: Collect
    },
     {
      path:'/atten',
      name:'atten',
      component: Atten
    },
     {
      path:'/follow',
      name:'follow',
      component: Follow
    },
     {
      path:'/searchFollow',
      name:'searchFollow',
      component: SearchFollow
    },
     {
      path:'/search',
      name:'search',
      component: Search
    },
    {
      path:'/rank',
      name:'rank',
      component: Rank
    },
      {
      path:'/channel',
      name:'channel',
      component: Channel
    },
    {
    	path:'*',
    	redirect:"/index"
    }
  ]
export default new Router({
	routes,
	mode: 'history'
})
