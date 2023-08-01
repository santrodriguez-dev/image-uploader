export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="uploader-main-container">
      <section className="uploader-main-container__content">
        {children}
      </section>
    </main>
  )
}
