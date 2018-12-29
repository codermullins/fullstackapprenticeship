import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { thunkSignIn } from "../auth";
import { CognitoUser } from "amazon-cognito-identity-js";

global.fetch = require("jest-fetch-mock");
const AWS = require("aws-sdk-mock");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockUser = {
    username: "topher.sikorra@gmail.com",
    password: "p@ssw0rd!",
    attributes: {
        email: "topher.sikorra@gmail.com"
    }
};

describe("thunkSignIn", () => {
    const returnData = {};
    const store = mockStore(mockUser);
    const expectedAuthSignInReturn = {
        user: mockUser.username,
        userConfirmed: true,
        userSub: typeof String
    };

    Auth.signIn = jest.fn().mockImplementation(() => {
        return {
            expectedAuthSignInReturn
        };
    });

    store.dispatch(
        thunkSignIn({
            username: mockUser.username,
            password: mockUser.password
        })
    );

    it("Dispatches awaitSignIn", () => {
        const expectedAction = {
            type: "AWAIT_SIGN_UP"
        };
        expect(store.getActions()).toContainEqual(expectedAction);
    });

    it("Calling authSignIn", () => {
        expect(expectedAuthSignInReturn);
    });
});
