interface ICurrentUser {
  currentUserId: number;
}
const getCurrentUser = (data: { [key: string]: any }): ICurrentUser => {
  const currentUserId = data['x-user-id'] as string;
  
  return ({ currentUserId: +currentUserId });
};

export default getCurrentUser;
