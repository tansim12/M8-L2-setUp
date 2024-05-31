export const successResponse = (result: any, message: string): object => {
    return {
      success: true,
      message: message,
      data: result,
    };
  };
  export const errorResponse = (error: any,): object => {
    return {
      success: false,
      message: error.message || "something went wrong",
      data: error,
    };
  };