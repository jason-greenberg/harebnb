function ProfileButton({ toggleDropDown, user }) {
  return (
    <div 
      style={{ fontSize: '20px' }}
      onClick={toggleDropDown}
    >
      <i class="fa-regular fa-user"></i>
    </div>
  )
}

export default ProfileButton;
