export default ({ app, store, redirect }) => {
  if (!store.state.user.uid) { return }
  if (!app.$firebase.auth().currentUser.emailVerified) { return redirect('/signin') }
}
