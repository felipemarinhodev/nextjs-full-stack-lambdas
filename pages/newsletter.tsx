import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Image from "@src/components/Image/Image";
import Text from "@src/components/Text/Text";
import { BaseComponent } from "@src/theme/BaseComponent";
import { useState } from "react";

function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues);

  return {
    values, handleChange(event) {
      const { name, value } = event.target;
      setValues(oldValue => ({
        ...oldValue,
        [name]: value
      }))
    }
  }
}

export default function NewsletterScreen() {
  const form = useForm({
    initialValues: {
      emailNewsletter: ""
    }
  });

  return (<Box
    styleSheet={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    <form onSubmit={(event) => {
      event.preventDefault()
      console.log("Estamos enviando os dados do formulário!");

      if (!form.values.emailNewsletter.includes("@")) {
        alert("Você precisa informar um email valido");
        return;
      }

      alert("Você foi cadastrado com sucesso! Cheque o seu mail para garantir!")
      fetch("/api/newsletter/optin", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form.values)
      })
        .then(async (response) => {
          console.log(await response.json());
        })
    }}>
      <Box
        styleSheet={{
          alignItems: 'center',
          width: "100%",
          maxWidth: "400px",
          padding: '16px'
        }}
      >
        <Image
          src="https://github.com/felipemarinhodev.png"
          alt="Foto do FelipeMarinhoDev"
          styleSheet={{
            borderRadius: "100%",
            width: "100px",
            marginBottom: "16px"
          }}
        />
        <Text variant="heading3">
          Newsletter do FelipeMarinhoDev
        </Text>
        <NewsletterTextField
          placeholder="Informe o seu email"
          name="emailNewsletter"
          value={form.values.emailNewsletter}
          onChange={(form.handleChange)}
        />
        <Button fullWidth styleSheet={{ marginTop: "16px" }}>Cadastrar </Button>
      </Box>
    </form>
  </Box>)
}

interface NewsletterTextFieldProps {
  placeholder?: string
  value?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function NewsletterTextField(props: NewsletterTextFieldProps) {
  return (
    <Box
      styleSheet={{
        width: "100%",
        maxWidth: "300px"
      }}
    >
      <BaseComponent
        as="input"
        {...props}
        styleSheet={{
          border: "1px solid rgb(195, 195, 195)",
          borderRadius: "4px",
          padding: "8px",
          width: "100%"
        }}
      />
    </Box>
  )
}
