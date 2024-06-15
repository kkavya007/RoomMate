const baseResponses = {
    success:(message,data=null) => ({success:true, message, data}),
    error:(message,data=null) => ({success:false, error:message, data}),
    constantMessages: {
        ALL_FIELDS_REQUIRED:(data=null) =>baseResponses.error('All fields are required',data),
        PASSWORD_MISMATCH:(data=null) =>baseResponses.error('Password do not match',data),
        USER_REGISTERED:(data=null) =>baseResponses.success('User registred successfully',data),
        USER_NOT_FOUND:(data=null) =>baseResponses.error('User not found',data),
        INVALID_PASSWORD:(data=null) =>baseResponses.error('Invalid password',data),
        USER_LOGGED_IN:(data=null) =>baseResponses.success('User logged in successfully',data),
    }
};
module.exports = {baseResponses};