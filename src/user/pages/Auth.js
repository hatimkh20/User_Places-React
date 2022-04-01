import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: true,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  const errorHandler = () => setError(null);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />

        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              type="text"
              placeholder="Hatim Khuzema"
              element="input"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name"
              onInput={inputHandler}
              value=""
            ></Input>
          )}
          <Input
            id="email"
            type="email"
            placeholder="abc@example.com"
            element="input"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid email"
            onInput={inputHandler}
            value=""
          >
            Email
          </Input>
          <Input
            id="password"
            type="password"
            placeholder="***********"
            element="input"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid password"
            onInput={inputHandler}
            value=""
          >
            Password
          </Input>

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Signup"}
          </Button>
        </form>

        <Button inverse onClick={switchModeHandler}>
          Switch To
          {isLoginMode ? " Sign up" : " Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
