const HelpPage = () => {
  return (
    <section className="mx-auto w-full max-w-[960px] py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-[32px] font-bold leading-[38px] text-black">
          {"\uB3C4\uC6C0\uB9D0"}
        </h1>

        <h2 className="text-[20px] font-bold leading-6 text-black">
          {"\uC774\uC6A9\uC218\uCE59"}
        </h2>

        {/* TODO: 관리자 전용 수정 API 연결 필요 */}
        <div className="h-[738px] w-full rounded-xl border border-[#999999] px-[25px] py-6">
          <p className="text-base font-normal text-[#999999]">{"///"}</p>
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
