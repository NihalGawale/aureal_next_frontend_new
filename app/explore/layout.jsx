// import "../../styles/globals.css";


export default function Explore({
  children, // will be a page or nested layout
}) {
  return (
    <section className="h-screen w-screen">
   
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}  
     
    </section>
  );
}