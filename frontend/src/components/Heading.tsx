function Heading({ text }: { text: string }) {
  return (
    <div>
      <div className="font-bold text-center ">{text}</div>
      <div className="text-center">Already have an account?</div>
    </div>
  );
}

export default Heading;
