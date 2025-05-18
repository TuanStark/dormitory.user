

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  address: string;
  identityCard: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export  async function getUserByEmail(email : String) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/user/${email}`);
  const data = await response.json();
  return data;
}

export  async function getUserByFacebookId(facebookId : String) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/user/facebook/${facebookId}`);
  const data = await response.json();
  return data;
}


