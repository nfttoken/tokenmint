import { expect } from 'chai';
import React from 'react';
import { ConfirmationPanel } from './ConfirmationPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';
import sinon from 'sinon';
import appStates from '../reducers/appStates';

Enzyme.configure({ adapter: new Adapter() });

const tokenName = "The First Amendment";
const tokenSymbol = "TFA";
const decimals = "18";
const totalSupply = "1000";
const tokenType = "erc20";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const payingAccount = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const isMobileDevice = false;
const serviceFee = 0.5;

describe("<ConfirmationPanel /> tests", () => {
  let mount;

  function setup(
    tokenName,
    tokenSymbol,
    decimals,
    totalSupply,
    tokenType,
    tokenOwner,
    isMobileDevice,
    payingAccount,
    serviceFee,
    setAppState = () => { },
    createTokens = () => { }
  ) {
    const props = {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      decimals: decimals,
      totalSupply: totalSupply,
      tokenType: tokenType,
      tokenOwner: tokenOwner,
      isMobileDevice: isMobileDevice,
      payingAccount: payingAccount,
      serviceFee: serviceFee,
      appStateActions: { setAppState: setAppState },
      createTokensActions: { createTokens: createTokens }
    };
    return mount(<ConfirmationPanel {...props} />);
  }

  before(() => {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;
    global.window = window;
    global.document = window.document;
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it("renders ConfirmationPanel non existing token name", () => {
    const wrapper = setup(
      initialState.tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.be.empty;
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(initialState.tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("renders ConfirmationPanel non existing token symbol", () => {
    const wrapper = setup(
      tokenName,
      initialState.tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.be.empty;
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(initialState.tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("renders ConfirmationPanel non existing decimals", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      "",
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq("");
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq("");
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("renders ConfirmationPanel non existing total supply", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      initialState.totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.be.empty;
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(initialState.totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("renders ConfirmationPanel non existing token owner", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      initialState.tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(initialState.tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(initialState.tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("renders ConfirmationPanel on mobile platform", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      true,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.true;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Confirm parameters");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("renders ConfirmationPanel on desktop platform", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(payingAccount);
    expect(wrapper.find("Typography").at(14).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(16).props().children[0]).to.eq(serviceFee);
  });

  it("simulates click on back button", () => {
    const setAppState = sinon.spy();
    const createTokens = sinon.spy();
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee,
      setAppState,
      createTokens
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setAppState.calledWith(appStates.HANDLE_PAYMENT)).to.be.true;
  });

  it("simulates click on next button - invalid props", () => {
    const setAppState = sinon.spy();
    const createTokens = sinon.spy();
    const wrapper = setup(
      initialState.tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee,
      setAppState,
      createTokens
    );
    wrapper.find("span").at(2).simulate("click");
    expect(createTokens.calledOnce).to.be.false;
  });

  it("simulates click on next button - valid props", () => {
    const setAppState = sinon.spy();
    const createTokens = sinon.spy();
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      isMobileDevice,
      payingAccount,
      serviceFee,
      setAppState,
      createTokens
    );
    wrapper.find("span").at(2).simulate("click");
    expect(createTokens.calledWith(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      serviceFee,
      payingAccount
    )).to.be.true;
  });
});
