import { authentication } from "@/ui-store/authentication.js"

// https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255

describe("Authentication", () => {

    beforeEach(() => {
    });

    it("should login with mock commit", () => {

        const expectedMutations = [
            {
                type: "loginRequest",
                payload: {
                    username: "test@test.com"
                }
            },
            {
                type: "setUserAuthorized",
                payload: true
            },
            {
                type: "loginSuccess",
                payload: {
                    email: "test@test.com",
                    authorized: false
                }
            }
        ]
        let count = 0;
        let data;
        const dispatch = {};
        const user = {
            email: "test@test.com",
            password: "test"
        }

        // The 3 commits happening in this test case are:
        // commit("setUserAuthorized", true);
        // commit('loginSuccess', user);
        let mockCommit = (type, payload) => {
            expect(type).toEqual(expectedMutations[count].type);
            expect(payload).toEqual(expectedMutations[count].payload);
            count += 1;
        }

        authentication.actions.login({ dispatch, commit: mockCommit }, user)
    })


})