type ProfileCardProps = {
  name: string
  age: number
  bio: string
  role: string
}

function ProfileCard({ name, age, bio, role }: ProfileCardProps) {
  return (
    <div>
      <h1>Name : {name}</h1>
      <h3>Age : {age}</h3>
      <h3>bio : {bio}</h3>
      <h3>role : {role}</h3>
    </div>
  )
}

export default ProfileCard