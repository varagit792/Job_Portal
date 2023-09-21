import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../..';
import { useAppDispatch } from '../../../..';
import { clearUploadState, resumeUpload } from '../../../../store/reducers/jobSeekerProfile/uploadResume';
import { clearGetProfileDashboardSlice, profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { formatDistanceToNow, parseISO } from 'date-fns';
import uploadIcon from '../../../../assets/svg/uploadIcon.svg';
import { MdOutlinePictureAsPdf } from 'react-icons/md';
import { FaRegFileWord } from 'react-icons/fa';
const ResumeUploadLeftPanel = () => {

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
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (error) {
      dispatch(clearUploadState)
    }
  }, [success, error, errorMessage, dispatch, formData]);

  useEffect(() => {
    if (successProfile) {
      dispatch(clearGetProfileDashboardSlice);
    }
  }, [successProfile]);

  useEffect(() => {
    setResumeFile(profileDashboard?.resumeFile)
    setResumeCompletePath(`${process.env.REACT_APP_RESUME_FILE_LOCATION}/${profileDashboard?.resumePath}`)
  }, [profileDashboard]);

  const resumeFileSplit = resumeFile?.split('.');
  let resumeFilePrefix;
  let resumeFileSuffix;
  if (resumeFile) {
    resumeFilePrefix = resumeFileSplit[0];
    resumeFileSuffix = resumeFileSplit[1];
  }

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

  return (
    <>
      <div className="rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] w-full h-full p-7">
        <div className=" h-full">
          <form>
            <h1 className="mb-3 text-[#64748B]">Resume</h1>
            {errorMessage ? <span className="text-red-600">{errorMessage}</span> : (resumeFile && lastUpdatedTimestamp !== null) && (
              <span className="mt-2">
                <span className="font-thin text-sm">Resume last updated - </span>
                <span className="text-sm">  {formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}</span>
              </span>
            )}
            <div className="border border-dashed border-[#A5B4FC] rounded-xl p-3 flex flex-col justify-center items-center">
              <span className=" text-gray-400 text-xs">Formats: .PDF and .DOC up to 2MB</span>
              <label className="cursor-pointer text-[#312E81] p-2 font-semibold text-base flex justify-center items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {resumeFile ? "Update Resume" : "Upload resume"}
                <img src={uploadIcon} alt="uploadIcon" className="ml-2" />
              </label>
            </div>
            {resumeFile && <div className="bg-[#FFF] rounded-lg shadow-sm px-4 py-2 flex justify-between items-center w-full mt-3">
              <div className="flex justify-start items-center w-11/12">
                {(resumeFileSuffix === 'pdf' && <MdOutlinePictureAsPdf className="text-red-400 " size={28} />)}
                {(resumeFileSuffix === 'doc' || resumeFileSuffix === 'docx') && <FaRegFileWord className="text-blue-400 " size={28} />}

                <h1 className="overflow-hidden inline-block whitespace-nowrap text-ellipsis ml-2 text-lg">{resumeFilePrefix}</h1>
              </div>

            </div>}
          </form>

        </div >
      </div >
    </>
  )
}

export default ResumeUploadLeftPanel;


