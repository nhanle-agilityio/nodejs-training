/**
 * Create a new user (registration)
 */
export const createUserHandler = async (req, res, next) => {
  try {
    const user = await req.userRepository.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUserHandler = async (req, res, next) => {
  try {
    // get user by id after authentication
    const user = await req.userRepository.findUserById(req.user.id);
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * Update current authenticated user
 */
export const updateUserHandler = async (req, res, next) => {
  try {
    // update user by id after authentication
    const updatedUser = await req.userRepository.updateUser(req.body, req.user.id);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete current authenticated user
 */
export const deleteUserHandler = async (req, res, next) => {
  try {
    // delete user by id after authentication
    await req.userRepository.deleteUser(req.user.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
