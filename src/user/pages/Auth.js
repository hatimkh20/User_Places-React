import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./Auth.css";

const Auth = () => {
  const [formState, inputHandler] = useForm(
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

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />

      <form onSubmit={authSubmitHandler}>
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

        <Button type="submit" disabled={!formState.isValid}>Login</Button>
      </form>
    </Card>
  );
};

export default Auth;
