import React from 'react';
import { TraineeSchedule } from '../types';
import { Calendar, Clock, MapPin, ArrowLeft, Hash, Table } from 'lucide-react';
import { GeminiAnalysis } from './GeminiAnalysis';

interface ScheduleViewProps {
  data: TraineeSchedule;
  onBack: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ data, onBack }) => {
  const hasData = data.schedule && data.schedule.some(d => d.courses.length > 0);

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-tvtc-green transition-colors print:hidden group"
      >
        <ArrowLeft className="ml-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        العودة للبحث
      </button>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-tvtc-green print:shadow-none print:border-2 mb-6">
        {/* Student Header */}
        <div className="p-6 bg-gray-50 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{data.traineeName}</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-gray-600">
              <span className="flex items-center gap-1">
                <span className="font-bold text-tvtc-green">الرقم التدريبي:</span> {data.traineeId}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-bold text-tvtc-green">التخصص:</span> {data.department}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white min-h-[400px]">
          {hasData ? (
            <div className="p-6 overflow-x-auto">
              <div className="min-w-full space-y-4">
                {data.schedule.map((day, idx) => (
                  <div key={idx} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 px-4 py-2 font-bold text-gray-700 border-b flex items-center gap-2">
                      <Calendar size={18} className="text-tvtc-green" />
                      {day.dayName}
                    </div>
                    <div className="p-4">
                      {day.courses.length === 0 ? (
                        <p className="text-gray-400 text-center py-2 italic">لا توجد محاضرات في هذا اليوم</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {day.courses.map((course) => (
                            <div key={course.id} className="bg-green-50 border border-green-100 rounded-lg p-3 relative group hover:border-green-300 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-tvtc-green">{course.courseName}</h4>
                                <span className="text-xs bg-white px-2 py-1 rounded border text-gray-500 font-mono">{course.courseCode}</span>
                              </div>
                              
                              <div className="space-y-1 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-tvtc-gold" />
                                  <span className="font-medium">{course.startTime} - {course.endTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} className="text-gray-400" />
                                  <span>{course.room}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Hash size={14} className="text-gray-400" />
                                  <span title="الرقم المرجعي / رقم الشعبة">{course.refNumber}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <Table size={48} className="mx-auto mb-4 opacity-20" />
              <p>لا توجد بيانات مجدولة للعرض.</p>
            </div>
          )}
        </div>
      </div>

      {/* Gemini Analysis Section */}
      {hasData && (
        <div className="print:hidden">
          <GeminiAnalysis schedule={data} />
        </div>
      )}
    </div>
  );
};