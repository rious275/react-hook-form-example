import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const schema = yup.object({
  id: yup
    .string()
    .required("아이디를 입력해주세요")
    .min(4, "최소 4글자 이상 입력해주세요!")
    .max(8, "아이디는 최대 8글자입니다!"),
  phone: yup
    .string()
    .required("휴대폰 번호를 입력해주세요")
    .matches(/^[0-9]+$/, "숫자만 입력해 주세요!"),
});

interface IExampleTypes {
  id: string;
  phone: string;
}

export default function Example() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IExampleTypes>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IExampleTypes> = data => {
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <div>
            <input type="text" placeholder="아이디" {...register("id")} />
            <p>{errors.id?.message}</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="휴대폰 번호"
              {...register("phone")}
            />
            <p>{errors.phone?.message}</p>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 98vh;

  form {
    width: 500px;

    button {
      width: 100%;
      height: 40px;
      border: 0;
      border-radius: 4px;
      background-color: #1e85c9;
      color: white;
    }
  }

  .input-wrapper {
    margin-top: 100px;

    div {
      margin-bottom: 30px;

      input {
        width: 476px;
        padding: 10px;

        :focus {
          outline: none;
        }
      }

      p {
        margin-top: 4px;
        font-size: 12px;
        color: red;
      }
    }
  }
`;
