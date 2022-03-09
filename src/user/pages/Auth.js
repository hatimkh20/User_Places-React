import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
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

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    }
    else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: true
        }
      }, false)
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
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
  );
};

export default Auth;
