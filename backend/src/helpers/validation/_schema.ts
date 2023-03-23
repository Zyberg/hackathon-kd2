const schema = {"$schema":"http://json-schema.org/draft-07/schema#","definitions":{"UserInterface":{"type":"object","properties":{"id":{"type":"number"},"name":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"email_verified_at":{"type":"string","format":"date-time"},"password_reset_token":{"type":["null","string"]},"blacklisted_tokens":{"type":"array","items":{"type":"string"}},"createdAt":{"type":"string","format":"date-time"},"updatedAt":{"type":"string","format":"date-time"},"save":{"$ref":"#/definitions/Function"}},"required":["createdAt","email","id","name","password","password_reset_token","save","updatedAt"]},"MyError":{"type":"object","properties":{"statusCode":{},"data":{},"title":{"type":"string"},"name":{"type":"string"},"message":{"type":"string"},"stack":{"type":"string"}},"required":["data","message","name","statusCode","title"]},"RegisterUserBodyInterface":{"type":"object","properties":{"name":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"confirm_password":{"type":"string"}},"required":["confirm_password","email","name","password"]},"VerifyEmailInputsInterface":{"type":"object","properties":{"recipient":{"type":"string"},"name":{"type":"string"},"verifyLink":{"type":"string"}},"required":["name","recipient","verifyLink"]},"FilteredUserInterface":{"type":"object","properties":{"id":{"type":"number"},"email":{"type":"string"}},"required":["email","id"]},"ResetPasswordInputsInterface":{"type":"object","properties":{"recipient":{"type":"string"},"resetLink":{"type":"string"},"name":{"type":"string"}},"required":["name","recipient","resetLink"]},"PasswordUpdatedInputsType":{"type":"object","properties":{"recipient":{"type":"string"},"name":{"type":"string"}},"required":["name","recipient"]},"AuthScope":{"enum":["Admin","User"],"type":"string"},"UserLoginRequest":{"type":"object","properties":{"email":{"format":"email","type":"string"},"password":{"type":"string"}},"required":["email","password"]},"UserCreateRequest":{"type":"object","properties":{"name":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"scope":{"enum":["Admin","User"],"type":"string"}},"required":["email","name","password","scope"]}}} as const;
export default schema.definitions;