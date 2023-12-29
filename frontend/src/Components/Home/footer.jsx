import { Footer } from "flowbite-react";

const CustFooter = () => {
  return (
    <Footer container>
      <Footer.LinkGroup>
        <Footer.Copyright
          by=" Searce RMS ™️"
          year={2023}
          style={{ marginRight: "10px" }}
        />
        <Footer.Link
          href="https://www.searce.com/"
          style={{ marginRight: "10px" }}
        >
          About
        </Footer.Link>
        <Footer.Link
          href="https://www.searce.com/policy"
          style={{ marginRight: "10px" }}
        >
          Privacy Policy
        </Footer.Link>
        <Footer.Link
          href="https://www.searce.com/partnership"
          style={{ marginRight: "10px" }}
        >
          Partners
        </Footer.Link>
        <Footer.Link href="https://www.searce.com/#lets-connect-box">
          Connect
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default CustFooter;
