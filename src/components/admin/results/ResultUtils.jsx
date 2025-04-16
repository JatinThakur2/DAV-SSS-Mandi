// src/components/admin/results/ResultUtils.jsx
import { useState, useEffect } from "react";

// Helper function to calculate percentage from marks and total
export const calculatePercentage = (marks, totalMarks) => {
  if (
    !marks ||
    !totalMarks ||
    isNaN(marks) ||
    isNaN(totalMarks) ||
    parseInt(totalMarks) === 0
  ) {
    return "";
  }

  return ((parseInt(marks) / parseInt(totalMarks)) * 100).toFixed(2) + "%";
};

// Hook to handle result state and calculations
export const useResultState = (initialResult) => {
  const [currentResult, setCurrentResult] = useState(initialResult);

  // Perform auto-calculations when inputs change
  useEffect(() => {
    updateCalculations();
  }, [
    currentResult.summary?.totalStudents,
    currentResult.summary?.passed,
    currentResult.data,
  ]);

  // Update calculated fields like percentages and position details
  const updateCalculations = () => {
    const { totalStudents, passed } = currentResult.summary || {};

    let updatedResult = { ...currentResult };

    // Update pass percentage if we have valid inputs
    if (totalStudents > 0 && passed >= 0) {
      const percentage = ((passed / totalStudents) * 100).toFixed(2);
      updatedResult = {
        ...updatedResult,
        summary: {
          ...updatedResult.summary,
          result: `${percentage}%`,
        },
      };
    }

    // Update student percentages if they have marks and totalMarks
    const updatedData = updatedResult.data.map((student) => {
      if (student.marks && student.totalMarks) {
        const percentage = calculatePercentage(
          student.marks,
          student.totalMarks
        );
        return {
          ...student,
          percentage,
        };
      }
      return student;
    });

    updatedResult = {
      ...updatedResult,
      data: updatedData,
    };

    // Auto-fill position details from the top students data if available
    const firstStudent = updatedData[0];
    const secondStudent = updatedData[1];

    if (firstStudent && firstStudent.name) {
      updatedResult = {
        ...updatedResult,
        summary: {
          ...updatedResult.summary,
          firstPosition: {
            name: firstStudent.name,
            marks: firstStudent.marks || "",
            totalMarks: firstStudent.totalMarks || "",
            percentage:
              firstStudent.percentage ||
              calculatePercentage(firstStudent.marks, firstStudent.totalMarks),
          },
        },
      };
    }

    if (secondStudent && secondStudent.name) {
      updatedResult = {
        ...updatedResult,
        summary: {
          ...updatedResult.summary,
          secondPosition: {
            name: secondStudent.name,
            marks: secondStudent.marks || "",
            totalMarks: secondStudent.totalMarks || "",
            percentage:
              secondStudent.percentage ||
              calculatePercentage(
                secondStudent.marks,
                secondStudent.totalMarks
              ),
          },
        },
      };
    }

    if (JSON.stringify(updatedResult) !== JSON.stringify(currentResult)) {
      setCurrentResult(updatedResult);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentResult({
      ...currentResult,
      [name]: value,
    });
  };

  const handleStudentInputChange = (index, field, value) => {
    const updatedData = [...currentResult.data];
    updatedData[index] = { ...updatedData[index], [field]: value };

    // If this is for marks or totalMarks, also update the percentage
    if (field === "marks" || field === "totalMarks") {
      const student = updatedData[index];
      if (student.marks && student.totalMarks) {
        updatedData[index].percentage = calculatePercentage(
          student.marks,
          student.totalMarks
        );
      }
    }

    setCurrentResult({
      ...currentResult,
      data: updatedData,
    });
  };

  const handleSummaryInputChange = (field, value) => {
    setCurrentResult({
      ...currentResult,
      summary: {
        ...currentResult.summary,
        [field]: value,
      },
    });
  };

  const handlePositionInputChange = (positionType, field, value) => {
    const updatedPosition = {
      ...currentResult.summary[positionType],
      [field]: value,
    };

    // Auto-calculate percentage if marks and totalMarks are provided
    if (
      (field === "marks" || field === "totalMarks") &&
      updatedPosition.marks &&
      updatedPosition.totalMarks
    ) {
      updatedPosition.percentage = calculatePercentage(
        updatedPosition.marks,
        updatedPosition.totalMarks
      );
    }

    setCurrentResult({
      ...currentResult,
      summary: {
        ...currentResult.summary,
        [positionType]: updatedPosition,
      },
    });
  };

  const handleAddStudent = () => {
    setCurrentResult({
      ...currentResult,
      data: [
        ...currentResult.data,
        {
          position: `${currentResult.data.length + 1}th`,
          name: "",
          marks: "",
          totalMarks: "",
          percentage: "",
        },
      ],
    });
  };

  const handleRemoveStudent = (index) => {
    const updatedData = [...currentResult.data];
    updatedData.splice(index, 1);
    setCurrentResult({
      ...currentResult,
      data: updatedData,
    });
  };

  return {
    currentResult,
    setCurrentResult,
    handleInputChange,
    handleStudentInputChange,
    handleSummaryInputChange,
    handlePositionInputChange,
    handleAddStudent,
    handleRemoveStudent,
  };
};

// Helper function to get available years for the dropdown
export const getAvailableYears = (existingYears = []) => {
  const availableYears = [];
  const currentYear = new Date().getFullYear();

  // Add recent years
  for (let i = 0; i <= 5; i++) {
    availableYears.push((currentYear - i).toString());
  }

  // Add existing years from the database that aren't already in the list
  existingYears.forEach((year) => {
    if (!availableYears.includes(year)) {
      availableYears.push(year);
    }
  });

  // Sort in descending order
  return availableYears.sort((a, b) => parseInt(b) - parseInt(a));
};

// Get the default initial result state
export const getDefaultResultState = () => ({
  year: new Date().getFullYear().toString(),
  class: "10",
  data: [
    { position: "1st", name: "", marks: "", totalMarks: "", percentage: "" },
    { position: "2nd", name: "", marks: "", totalMarks: "", percentage: "" },
    { position: "3rd", name: "", marks: "", totalMarks: "", percentage: "" },
  ],
  summary: {
    totalStudents: 0,
    passed: 0,
    result: "0%",
    firstPosition: {
      name: "",
      marks: "",
      totalMarks: "",
      percentage: "",
    },
    secondPosition: {
      name: "",
      marks: "",
      totalMarks: "",
      percentage: "",
    },
  },
});
