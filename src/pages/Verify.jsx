import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useVerifyContext from '../hooks/useVerifyContext.js';
import { ACTION_TYPES } from '../utils/actionTypes';
import Loader from '../components/Loader.jsx';

const Verify = () => {
  const { userToken } = useParams();
  const { dispatch, email, isVerified, isSent, statusMessage, isFetching, isError, errorMessage } =
    useVerifyContext();

  const handleVerify = async () => {
    dispatch({ type: ACTION_TYPES.RESET });
    dispatch({ type: ACTION_TYPES.VERIFICATION_REQUEST });

    const response = await fetch(`http://localhost:8000/api/users/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.VERIFICATION_SUCCEED, payload: data });
    } else {
      dispatch({ type: ACTION_TYPES.VERIFICATION_FAILED, payload: data });
    }
  };

  const handleResendVerification = async () => {
    dispatch({ type: ACTION_TYPES.RESET });
    dispatch({ type: ACTION_TYPES.RESEND_VERIFICATION_REQUEST });

    const response = await fetch('http://localhost:8000/api/users/resend-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION_TYPES.RESEND_VERIFICATION_SUCCEED, payload: data });
    } else {
      dispatch({ type: ACTION_TYPES.RESEND_VERIFICATION_FAILED, payload: data });
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      dispatch({ type: ACTION_TYPES.RESET });
      dispatch({ type: ACTION_TYPES.GET_DETAILS_REQUEST });

      const response = await fetch('http://localhost:8000/api/users/get-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userToken }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ACTION_TYPES.GET_DETAILS_SUCCEED, payload: data });
      } else {
        dispatch({ type: ACTION_TYPES.GET_DETAILS_FAILED, payload: data });
      }
    };

    getDetails();
  }, [dispatch, userToken]);

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-6 w-96">
        <>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-2xl">EMAIL ADDRESS VERIFICATION</h3>
            <p className="text-xs text-center">
              {errorMessage} <span className="font-semibold">{email}</span>.
            </p>
          </div>
          <div>
            <button
              id="resendButton"
              onClick={handleResendVerification}
              className="border-[1px] bg-blue-500 border-solid border-black cursor-pointer text-white font-semibold p-2"
            >
              Send Verification Mail
            </button>
          </div>
        </>
      </div>
    );
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-6 w-96">
        <>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-2xl">EMAIL ADDRESS VERIFICATION</h3>
            <p className="text-xs text-center">
              {statusMessage} <span className="font-semibold">{email}</span>.
            </p>
          </div>
          <div>{null}</div>
        </>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-96">
      {isVerified ? (
        <>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-2xl">EMAIL ADDRESS VERIFICATION</h3>
            <p className="text-xs text-center">{statusMessage}</p>
          </div>
          <div>
            <Link
              to="/"
              className="border-[1px] bg-blue-500 border-solid border-black cursor-pointer text-white font-semibold p-2"
            >
              LOGIN
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-2xl">EMAIL ADDRESS VERIFICATION</h3>
            <p className="text-xs text-center">
              {statusMessage} <span className="font-semibold">{email}</span>
            </p>
          </div>
          <div>
            <button
              id="verfiyButton"
              onClick={handleVerify}
              className="border-[1px] bg-blue-500 border-solid border-black cursor-pointer text-white font-semibold p-2"
            >
              Verify Email
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;
