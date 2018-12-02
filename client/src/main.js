import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueApollo);
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient,
});

Vue.config.productionTip = false;

Vue.filter('date', function (value) {
  if (!value) return ''
  let test = new Date(parseInt(value,10));
  return test.toLocaleString('sk-SK');
})

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
