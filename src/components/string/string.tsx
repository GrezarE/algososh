import React, {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string.module.css";

interface ICircle {
  color: ElementStates;
  letter: string;
}

export const StringPage = () => {
  const [inputText, changeInputText] = useState("");
  const [result, setResult] = useState<ICircle[]>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const stringReverse = (text: string) => {
    let obj = text.split("").map((item) => {
      return { color: ElementStates.Default, letter: item };
    });
    setResult([...obj]);
    for (let i = 0; i < obj.length / 2; i++) {
      (function () {
        setTimeout(() => {
          obj[i] = { ...obj[i], color: ElementStates.Changing };
          obj[obj.length - 1 - i] = {
            ...obj[obj.length - 1 - i],
            color: ElementStates.Changing,
          };
          setResult([...obj]);
          setTimeout(() => {
            const first = obj[i].letter;
            const second = obj[obj.length - 1 - i].letter;
            obj[i] = { letter: second, color: ElementStates.Modified };
            obj[obj.length - 1 - i] = {
              letter: first,
              color: ElementStates.Modified,
            };
            setResult([...obj]);
          }, DELAY_IN_MS);
        }, DELAY_IN_MS * i);
      })();
    }
    setTimeout(() => {
      setIsLoader(false);
    }, DELAY_IN_MS * (obj.length / 2));
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    changeInputText(evt.target.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    setIsLoader(true);
    stringReverse(inputText);
    // let obj = inputText.split("").map((item) => {
    //   return { color: ElementStates.Default, letter: item };
    // });
    // setResult([...obj]);
    // for (let i = 0; i < obj.length / 2; i++) {
    //   obj[i] = { ...obj[i], color: ElementStates.Changing };
    //   obj[obj.length - 1 - i] = {
    //     ...obj[obj.length - 1 - i],
    //     color: ElementStates.Changing,
    //   };
    //   setResult([...obj]);
    //   await new Promise((resolve: any) =>
    //     setTimeout(() => {
    //       resolve();
    //     }, DELAY_IN_MS)
    //   );
    //   const first = obj[i].letter;
    //   const second = obj[obj.length - 1 - i].letter;
    //   obj[i] = { letter: second, color: ElementStates.Modified };
    //   obj[obj.length - 1 - i] = {
    //     letter: first,
    //     color: ElementStates.Modified,
    //   };
    //   setResult([...obj]);
    // }
    // setIsLoader(false);
  };

  useEffect(() => {
    if (inputText.length < 1) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [inputText]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <>
      <form className={styles.form__box} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={onChange}
          data-testid="input"
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoader}
          disabled={buttonDisabled}
          data-testid="button"
        />
      </form>
      <div className={styles.circles__box}>
        {result &&
          result.map((item: ICircle, index: number) => (
            <Circle
              letter={item.letter}
              state={item.color}
              key={index}
              data-testid={`Circle_${index}`}
            />
          ))}
      </div>
    </>
  );
};

export const StringComponent: React.FC = () => {
  // const [inputText, changeInputText] = useState("");
  // const [result, setResult] = useState<ICircle[]>();
  // const [isLoader, setIsLoader] = useState<boolean>(false);
  // const [buttonDisabled, setButtonDisabled] = useState(false);

  // const stringReverse = (text: string) => {
  //   let obj = text.split("").map((item) => {
  //     return { color: ElementStates.Default, letter: item };
  //   });
  //   setResult([...obj]);
  //   for (let i = 0; i < obj.length / 2; i++) {
  //     (function () {
  //       setTimeout(() => {
  //         obj[i] = { ...obj[i], color: ElementStates.Changing };
  //         obj[obj.length - 1 - i] = {
  //           ...obj[obj.length - 1 - i],
  //           color: ElementStates.Changing,
  //         };
  //         setResult([...obj]);
  //         setTimeout(() => {
  //           const first = obj[i].letter;
  //           const second = obj[obj.length - 1 - i].letter;
  //           obj[i] = { letter: second, color: ElementStates.Modified };
  //           obj[obj.length - 1 - i] = {
  //             letter: first,
  //             color: ElementStates.Modified,
  //           };
  //           setResult([...obj]);
  //         }, DELAY_IN_MS);
  //       }, DELAY_IN_MS * i);
  //     })();
  //   }
  //   setTimeout(() => {
  //     setIsLoader(false);
  //   }, DELAY_IN_MS * (obj.length / 2));
  // };

  // const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
  //   changeInputText(evt.target.value);
  // };
  // const onSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
  //   evt.preventDefault();
  //   setIsLoader(true);
  //   // stringReverse(inputText);
  //   let obj = inputText.split("").map((item) => {
  //     return { color: ElementStates.Default, letter: item };
  //   });
  //   setResult([...obj]);
  //   for (let i = 0; i < obj.length / 2; i++) {
  //     obj[i] = { ...obj[i], color: ElementStates.Changing };
  //     obj[obj.length - 1 - i] = {
  //       ...obj[obj.length - 1 - i],
  //       color: ElementStates.Changing,
  //     };
  //     setResult([...obj]);
  //     await new Promise((resolve: any) =>
  //       setTimeout(() => {
  //         resolve();
  //       }, DELAY_IN_MS)
  //     );
  //     const first = obj[i].letter;
  //     const second = obj[obj.length - 1 - i].letter;
  //     obj[i] = { letter: second, color: ElementStates.Modified };
  //     obj[obj.length - 1 - i] = {
  //       letter: first,
  //       color: ElementStates.Modified,
  //     };
  //     setResult([...obj]);
  //   }
  //   setIsLoader(false);
  // };

  // useEffect(() => {
  //   if (inputText.length < 1) {
  //     setButtonDisabled(true);
  //   } else {
  //     setButtonDisabled(false);
  //   }
  // }, [inputText]);

  return (
    <SolutionLayout title="Строка">
      <StringPage />
      {/* <form className={styles.form__box} onSubmit={onSubmit}>
        <Input maxLength={11} isLimitText={true} onChange={onChange} />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoader}
          disabled={buttonDisabled}
        />
      </form>
      <div className={styles.circles__box}>
        {result &&
          result.map((item: ICircle, index: number) => (
            <Circle letter={item.letter} state={item.color} key={index} />
          ))}
      </div> */}
    </SolutionLayout>
  );
};
