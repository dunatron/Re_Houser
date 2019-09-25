import PleaseSignIn from '../../components/PleaseSignIn';
const MessagesPage = props => (
  <div>
    <PleaseSignIn message="You must be signed in to view messages">
      <h1>I will be your messages</h1>
    </PleaseSignIn>
  </div>
);

export default MessagesPage;
