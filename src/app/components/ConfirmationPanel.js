import React from 'react';
import './css/ConfirmationPanel.css';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as appStateActions from '../actions/appStateActions';
import * as createTokensActions from '../actions/createTokensActions';
import InputValidator from '../../tools/InputValidator';
import ReactGA from 'react-ga';
import appStates from '../reducers/appStates';
import initialState from '../reducers/initialState';

export class ConfirmationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.isConfirmationEnabled = this.isConfirmationEnabled.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/confirm"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/confirm');
  }

  isConfirmationEnabled() {
    return InputValidator.isInputValid(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenOwner
    ) && this.props.payingAccount !== initialState.payingAccount;
  }

  handleBack(e) {
    this.props.appStateActions.setAppState(appStates.HANDLE_PAYMENT);
  }

  handleConfirm(e) {
    this.props.createTokensActions.createTokens(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenType,
      this.props.tokenOwner,
      this.props.serviceFee,
      this.props.payingAccount
    );
  }

  render() {
    let nextButton = this.isConfirmationEnabled() ?
      (
        <span
          className="btn btn-confirm wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleConfirm}
        >
          <FontAwesomeIcon className="fa_confirm_icon" icon={faCheck} />
          {!this.props.isMobileDevice && " Finish"}
        </span>
      ) : (
        <span
          className="btn btn-confirm-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          <FontAwesomeIcon className="fa_confirm_icon" icon={faCheck} />
          {!this.props.isMobileDevice && " Finish"}
        </span>
      );

    const cardHeaderTitle = this.props.isMobileDevice ? "Confirm parameters" : "Please Confirm Token Creation Parameters!";

    return (
      <div>
        <Card className="card">
          <CardHeader
            title={cardHeaderTitle}
            classes={{
              root: "card_header",
              title: "card_header_text"
            }}
          />
          <CardContent
            classes={{
              root: "card_content"
            }}
          >
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Type:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.tokenType}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Name:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.tokenName}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Symbol:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.tokenSymbol}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Decimals:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.decimals}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Total Supply:
              </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                >
                  {this.props.totalSupply}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Paying Account:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className="grid_cell">
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.payingAccount}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Token Owner:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className="grid_cell">
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.tokenOwner}
                </Typography>
              </Grid>
            </Grid>
            <Grid className="grid_container" container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_left"
                >
                  Service Fee:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className="grid_cell">
                <Typography
                  align="left"
                  variant="body1"
                  className="typography_right"
                  gutterBottom
                >
                  {this.props.serviceFee} ETH (plus mining fee)
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <Grid container spacing={8}>
            <Grid item xs={6} md={6} className="grid_cell">
              <span
                className="btn btn-cancel wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleBack}
              >
                <FontAwesomeIcon className="fa_back_icon" icon={faChevronLeft} />
                {!this.props.isMobileDevice && " Back"}
              </span>
            </Grid>
            <Grid item xs={6} md={6} className="grid_cell">
              {nextButton}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

ConfirmationPanel.propTypes = {
  appStateActions: PropTypes.object.isRequired,
  createTokensActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  payingAccount: PropTypes.string.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
  serviceFee: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply,
    tokenType: state.tokenType,
    tokenOwner: state.tokenOwner,
    payingAccount: state.payingAccount,
    isMobileDevice: state.isMobileDevice,
    serviceFee: state.serviceFee
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    createTokensActions: bindActionCreators(createTokensActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPanel);
