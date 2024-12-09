import './css/MainPage.css';

function MainPage() {
  const redirectToForm = (role) => {
    switch (role) {
      case 'farmer':
        window.location.href = '/farmer-register'; // Update to the new path
        break;
      case 'user':
        window.location.href = '/user-signup';
        break;
      case 'admin':
        window.location.href = '/admin-signup';
        break;
      default:
        break;
    }
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <h1 className="title">Join Our DakshKrishi</h1>
        <p className="subtitle">A Platform Where Farmers Can Sale There Products By There Own </p>
        <p className="subtitle">Choose your role and sign up to get started</p>
        <div className="button-container">
          <button className="button farmer-button" onClick={() => redirectToForm('farmer')}>
            Sign Up as Farmer
          </button>
          <button className="button user-button" onClick={() => redirectToForm('user')}>
            Sign Up as User
          </button>
          <button className="button admin-button" onClick={() => redirectToForm('admin')}>
            Sign Up as Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

