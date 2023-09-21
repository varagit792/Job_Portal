import ResumeUploadForm from './ResumeUploadForm';
import About from './About';
const ResumeUpload = () => {

  return (
    <>
      <div className="rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] w-full h-full p-7">
        <div className=" h-full">
          <ResumeUploadForm />
          <About />
        </div>
      </div>
    </>
  )
}

export default ResumeUpload;


