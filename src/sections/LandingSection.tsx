import Editor from "../components/Editor.tsx";
import Hero from "../components/Hero.tsx";

const LandingSection = () => {
    return (
        <section className="relative w-screen min-h-lvh">
            <Hero/>
            <Editor/>
        </section>
    )
}
export default LandingSection
