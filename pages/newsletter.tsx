import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Image from "@src/components/Image/Image";
import Text from "@src/components/Text/Text";
import { BaseComponent } from "@src/theme/BaseComponent";

export default function NewsletterScreen() {
  return (<Box
    styleSheet={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
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
      <NewsletterTextField placeholder="Informe o seu email" />
      <Button fullWidth styleSheet={{ marginTop: "16px" }}>Cadastrar </Button>
    </Box>
  </Box>)
}

interface NewsletterTextFieldProps {
  placeholder?: string
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
