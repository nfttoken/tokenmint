import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as createTokensActions from './createTokensActions';
import appStates from '../reducers/appStates';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const miningMessage = "Your tokens are being mined. This might take a few minutes. Confirm transaction in your wallet.";
const rejectMessage = "Could not check token owner ETH funds.";
const txHash = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fe4";
const tokenName = "The First Amendment";
const tokenSymbol = "TFA";
const decimals = "18";
const totalSupply = "1000";
const tokenType = "erc20";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

describe("createTokensActions tests", () => {
  it("creates tokens successfully", (done) => {
    const createTokensStub = sinon.stub(mintApi, "mintTokens").resolves(txHash);
    const expectedActions = [
      { type: types.SET_INFO_MESSAGE, infoMessage: miningMessage },
      { type: types.SET_APP_STATE, appState: appStates.MINING_IN_PROGRESS },
      { type: types.SET_INFO_MESSAGE, infoMessage: txHash },
      { type: types.SET_APP_STATE, appState: appStates.MINING_CONFIRMED }
    ];
    const store = mockStore({ infoMessage: "", appState: appStates.INIT }, expectedActions);
    store.dispatch(createTokensActions.createTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      createTokensStub.restore();
      done();
    });
  });

  it("creates tokens with exception", (done) => {
    const createTokensStub = sinon.stub(mintApi, "mintTokens").rejects(new Error(rejectMessage));
    const expectedActions = [
      { type: types.SET_INFO_MESSAGE, infoMessage: miningMessage },
      { type: types.SET_APP_STATE, appState: appStates.MINING_IN_PROGRESS },
      { type: types.SET_INFO_MESSAGE, infoMessage: rejectMessage },
      { type: types.SET_APP_STATE, appState: appStates.MINING_FAILED }
    ];
    const store = mockStore({ infoMessage: "", appState: appStates.INIT }, expectedActions);
    store.dispatch(createTokensActions.createTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      expect(actions[3]).to.deep.equal(expectedActions[3]);
      createTokensStub.restore();
      done();
    });
  });
});
