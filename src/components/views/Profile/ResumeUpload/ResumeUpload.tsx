import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../..';
import { useAppDispatch } from '../../../..';
import { clearUploadState, resumeUpload } from '../../../../store/reducers/jobSeekerProfile/uploadResume';
import { BiDownload } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { resumeDelete, clearresumeDeleteState } from '../../../../store/reducers/jobSeekerProfile/deleteResume';
import axios from 'axios';
import { clearGetProfileDashboardSlice, profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { formatDistanceToNow, parseISO } from 'date-fns';
import uploadIcon from '../../../../assets/svg/uploadIcon.svg';
import ThreeDots from '../../../../assets/svg/threeDots.svg';
import PDFIcon from '../../../../assets/svg/PDFIcon.svg'

const ResumeUpload = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { success, errorMessage, error, formData } = useAppSelector((state) => state.jobSeekerResumeUpload);
  const [resumeFile, setResumeFile] = useState<string>('');
  const [resumeCompletePath, setResumeCompletePath] = useState<string>('');
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { success: successProfile, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: successDelete, errorMessage: errorMessageDelete, error: errorDelete, formData: formDataDelete } =
    useAppSelector((state) => state.jobSeekerDeleteResume);

  useEffect(() => {
    if (success) {
      dispatch(profileDashboardGet());
      dispatch(clearUploadState);
    }
    if (error) {
      dispatch(clearUploadState)
    }
  }, [success, error, errorMessage, dispatch, formData]);

  useEffect(() => {
    if (successDelete) {
      dispatch(profileDashboardGet());
      dispatch(clearresumeDeleteState);
    }
    if (errorDelete) {
      dispatch(clearresumeDeleteState)
    }
  }, [successDelete, errorDelete, errorMessageDelete, dispatch, formDataDelete]);

  useEffect(() => {
    if (successProfile) {
      dispatch(clearGetProfileDashboardSlice);
    }
  }, [successProfile]);

  useEffect(() => {
    setResumeFile(profileDashboard?.resumeFile)
    setResumeCompletePath(`${process.env.REACT_APP_RESUME_FILE_LOCATION}/${profileDashboard?.resumePath}`)
  }, [profileDashboard]);

  const parsedDate = parseISO(profileDashboard?.resumeLastUpdated);
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [profileDashboard])
  const handleFileChange = async (event: ChangeEvent) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0];
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      try {
        dispatch(resumeUpload(formData))

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        };

      } catch (error) {
        console.log('error', error);
      }
    }
  }

  const downloadFile = async () => {

    const APL_URL = process.env.REACT_APP_API_PATH;
    try {
      const response = await axios.get(resumeCompletePath, {
        responseType: 'blob', // Specify the response type as 'blob'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', profileDashboard?.resumeFile); // Replace with the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDeleteResume = () => {
    const data = {
      resumeFile: formData.resumeFile,
      resumePath: formData.resumePath
    }
    dispatch(resumeDelete(data));
  }

  return (
    <>
      {/* <div className="w-full h-full rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] p-4">
        <h1 className="mb-2 font-bold">Resume</h1>
        <p className="text-sm text-gray-500">
          Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.
        </p>
        {(resumeFile && lastUpdatedTimestamp !== null) && (<span><span className="font-thin text-sm">Resume last updated - </span><span className="text-sm">  {formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true }
        )}</span></span>)}
        <div className="mb-4">
          {(resumeFile && (
            <div>
              <br />
              <div className="flex justify-between">
                <p className="text-gray-600 font-semibold">{resumeFile}</p>
                <div className="flex flex-row">
                  <div className="text-blue-600 text-lg cursor-pointer">
                    <div onClick={downloadFile}>
                      <BiDownload />
                    </div>
                  </div>
                  <div className="ml-6 text-blue-600 text-lg mr-2 cursor-pointer" onClick={handleDeleteResume}> <RiDeleteBin6Line /></div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <form >
          <div className="p-10 border border-dashed border-gray-500 rounded-2xl flex flex-col justify-center items-center">
            <label className="cursor-pointer px-3 py-1 mb-1 rounded-3xl border-2 border-blue-400">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.rdf"
                className="hidden"
                onChange={handleFileChange}
              />
              {resumeFile ? "Update Resume" : "Upload Resume"}
            </label>
            <span className=" text-gray-400">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>
          </div>
        </form>
      </div> */}
      <div className="rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] w-full h-full p-7">
        <h1 className="mb-3 text-[#64748B]">Resume</h1>
        {(resumeFile && lastUpdatedTimestamp !== null) && (
          <span className="mt-2">
            <span className="font-thin text-sm">Resume last updated - </span>
            <span className="text-sm">  {formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}</span>
          </span>
        )}
        <div className="h-full">
          <form className="h-1/2">
            <div className="border border-dashed border-[#A5B4FC] rounded-xl p-3 flex flex-col justify-center items-center mb-3">
              <span className=" text-gray-400 text-xs">Formats: .PDF and .DOC up to 2MB</span>
              <label className="cursor-pointer text-[#312E81] p-2 font-semibold text-base flex justify-center items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.rdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {resumeFile ? "Update Resume" : "Upload resume"}
                <img src={uploadIcon} alt="uploadIcon" className="ml-2" />
              </label>
            </div>
            <div className="bg-[#FFF] rounded-lg shadow-sm px-4 py-2 flex justify-between items-center w-full">
              <div className="flex justify-start items-center w-11/12">
                <img src={PDFIcon} alt="PDFIcon" />
                <h1 className="overflow-hidden inline-block whitespace-nowrap text-ellipsis ml-2">Dibya12338427923890483490</h1>
              </div>
              <div className="w-1/12 flex justify-between items-center">
                <span className="border-r-2 border-[#E0E7FF] h-7 ml-1"></span>
                <img src={ThreeDots} alt="ThreeDots" />
              </div>
            </div>
          </form>
          <hr className="bg-[#E0E7FF] w-full my-4" />
          <div className="h-5/12">
            <h1 className="mb-3 text-[#64748B]">About</h1>
            <p className="text-sm">
              I turn ideas into intuitive and user-friendly digital experience through UI UX design.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeUpload;