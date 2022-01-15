
export default function ({
    isHMR, app, store, route, params, error, redirect
  }) {
    if (isHMR) { 
      return;
    } 
    else if (!params.lang) {
      if(route.path.indexOf('open/calculator') !== -1){
        return;
      }else{
        return redirect('/zh'+route.fullPath);
      }

    }
    

    const locale = params.lang || 'zh';
    store.commit('SET_LANG', locale);
    app.i18n.locale = store.state.locale;
  }