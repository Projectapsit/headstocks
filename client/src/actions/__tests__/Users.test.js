import * as action from "../Users";
import {
  CREATE_USER,
  LOGIN,
  RESET_PASSWORD,
  SEND_OTP,
  VERIFY_OTP,
  ERROR_TYPE
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Users Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should create a new user and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      name: "Piyush Gupta",
      email: "guptapiyush@gmail.com",
      phone: "8529637412",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/signup", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: CREATE_USER,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.createUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should not create a new user if any one of the field is empty and return status code of 400 with a message", () => {
    const responseOfApi = [{}, {}];
    let user = {
      name: "",
      email: "guptapiyush@gmail.com",
      phone: "8529637412",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/signup", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: ERROR_TYPE,
        payload: undefined
      }
    ];
    return store.dispatch(action.createUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should login a user successfully and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      email: "guptapiyush@gmail.com",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/login", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: LOGIN,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.login(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should not login a user if the credentials don't match and return status code of 400 with a message", () => {
    const responseOfApi = [{}, {}];
    let user = {
      email: "guptapiyush@gmail.com",
      password: "piyush"
    };
    moxios.stubRequest("http://localhost:2001/api/users/login", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: ERROR_TYPE,
        payload: undefined
      }
    ];
    return store.dispatch(action.login(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should reset password of a user if the email is registered and  return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      email: "guptapiyush@gmail.com",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/reset_password", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: RESET_PASSWORD,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.resetPassword(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should not reset password of a user if the email is not  registered and  return status code of 400 with a message", () => {
    const responseOfApi = [];
    let user = {
      email: "piyush@gmail.com",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/reset_password", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.resetPassword(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should send email to a user if the email is registered and  return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      email: "guptapiyush@gmail.com"
    };
    moxios.stubRequest("http://localhost:2001/api/users/send_otp", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: SEND_OTP,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.sendOtp(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should not email to  a user if the email is not  registered and  return status code of 400 with a message", () => {
    const responseOfApi = [];
    let user = {
      email: "piyush@gmail.com"
    };
    moxios.stubRequest("http://localhost:2001/api/users/send_otp", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.sendOtp(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should verify the otp enterd by user and  return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      otp: 2546
    };
    moxios.stubRequest("http://localhost:2001/api/users/verify_otp", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: VERIFY_OTP,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.verifyOtp(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should vreify the otp and send error if the otp is invalid and  return status code of 400 with a message", () => {
    const responseOfApi = [];
    let user = {
      otp: 1234
    };
    moxios.stubRequest("http://localhost:2001/api/users/verify_otp", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.verifyOtp(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});